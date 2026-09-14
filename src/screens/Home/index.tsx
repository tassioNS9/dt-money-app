import { useTransactionContext } from "@/context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListHeader } from "./ListHeader";
import { TransactionCard } from "./TransactionCard";
import { EmptyList } from "./EmptyList";
import { colors } from "@/shared/colors";

export const Home = () => {
  const {
    fetchCategories,
    fetchTransactions,
    refreshTransactions,
    loadMoreTransactions,
    transactions,
    handleLoadings,
    loadings,
  } = useTransactionContext();
  const { handleError } = useErrorHandler();

  const handleFetchCategories = async () => {
    handleLoadings({ key: "initial", value: true });
    try {
      await fetchCategories();
    } catch (error) {
      handleError(error, "Erro ao buscar categorias");
    } finally {
      handleLoadings({ key: "initial", value: false });
    }
  };

  const handleFetchInitialTransactions = async () => {
    handleLoadings({ key: "initial", value: true });
    try {
      await fetchTransactions({ page: 1 });
    } catch (error) {
      handleError(error, "Erro ao buscar transações");
    } finally {
      handleLoadings({ key: "initial", value: false });
    }
  };

  const handleLoadMoreTransactions = async () => {
    handleLoadings({ key: "loadMore", value: true });
    try {
      await loadMoreTransactions();
    } catch (error) {
      handleError(error, "Erro ao carregar mais transações");
    } finally {
      handleLoadings({ key: "loadMore", value: false });
    }
  };

  const handleRefreshTransactions = async () => {
    handleLoadings({ key: "refresh", value: true });
    try {
      await refreshTransactions();
    } catch (error) {
      handleError(error, "Erro ao Recarregar transações");
    } finally {
      handleLoadings({ key: "refresh", value: false });
    }
  };

  useEffect(() => {
    (async () => {
      await Promise.all([
        handleFetchCategories(),
        handleFetchInitialTransactions(),
      ]);
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <FlatList
        className="bg-background-secondary"
        ListHeaderComponent={ListHeader}
        data={transactions}
        keyExtractor={({ id }) => `transaction-${id}`}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        onEndReached={handleLoadMoreTransactions}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadings.loadMore ? (
            <ActivityIndicator
              color={colors["accent-brand-light"]}
              size="large"
            />
          ) : null
        }
        ListEmptyComponent={loadings.initial ? null : <EmptyList />}
        // O loadings.initial é para não mostrar a mensagem de lista vazia enquanto está carregando as transações iniciais,
        //  evitando que o usuário veja a mensagem de "Nenhuma transação encontrada" antes que os dados sejam carregados.
        refreshControl={
          <RefreshControl
            refreshing={loadings.refresh}
            onRefresh={handleRefreshTransactions}
          />
        }
      />
    </SafeAreaView>
  );
};
